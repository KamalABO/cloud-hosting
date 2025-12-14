import { prisma } from '@/utils/db';
import { UpdateArticleDto } from '@/utils/dtos';
import { verifyToken } from '@/utils/verifyToken';
import {NextRequest, NextResponse} from 'next/server'
 interface props{
    params: { id: string }
}
    /**
     * @method GET
     * @route http://localhost:3000/api/articles/:id
     * @description get single article by [id]
     * @access public 
     */
    export async function GET(request: NextRequest, { params }: props){
        try {
            const article = await prisma.article.findUnique({
                where: { id: parseInt( params.id)},
                include:{
                    comments: {
                        include: {
                            user: {
                                select: {
                                    username: true,
                                    email: true,
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            })
            if (!article) {
                return NextResponse.json({ message: 'article not found' }, { status: 404 });
            }
            return NextResponse.json(article, {status: 200})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return NextResponse.json(
                { message: "Something went wrong" },
                { status: 500 }
              );
        }
    }

    /**
     * @method PUT
     * @route http://localhost:3000/api/articles/:id
     * @description Update article by [id]
     * @access private (only admin can update article) 
     */
    export async function PUT(request: NextRequest, { params }: props){
        try {
                const user = verifyToken(request);
                if (!user || !user.isAdmin) {
                  return NextResponse.json(
                    { message: "only admin can update article" },
                    { status: 403 }
                  );
                }
            const article = await prisma.article.findUnique({where: { id: parseInt( params.id)}})
            if (!article) {
                return NextResponse.json({ message: 'article not found' }, { status: 404 });
            }
            const body =( await request.json()) as UpdateArticleDto
            const updatedArticle = await prisma.article.update({
                where: {id: parseInt(params.id)},
                data: {title: body.title, description: body.description}
            })
            return NextResponse.json(updatedArticle, {status: 200})
        } catch (error) {
            return NextResponse.json(
                { message: "Something went wrong" },
                { status: 500 }
              );
        }
    }

    /**
     * @method DELETE
     * @route http://localhost:3000/api/articles/:id
     * @description Delete article by [id]
     * @access public 
     */
    export async function DELETE(request: NextRequest, { params }: props){
        try {
                const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "only admin can delete article" },
        { status: 403 }
      );
    }
            const article = await prisma.article.findUnique({
                where: {id: parseInt(params.id)} ,
                include: {comments: true}
            })
            if (!article) {
                return NextResponse.json({ message: 'article not found' }, { status: 404 });
            }
            // delete article
            await prisma.article.delete({where: {id: parseInt(params.id)}})
            // delete comments associated with the article
            const commentIds: number[] = article?.comments.map((comment) => comment.id);
            await prisma.comment.deleteMany({where: {id: {in: commentIds}}})
    
            return NextResponse.json({message:'article deleted'}, {status: 200})
        } catch (error) {
            return NextResponse.json(
                { message: "Something went wrong" },
                { status: 500 }
              );
        }
    }