/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from 'bcryptjs'
import { updateUserSchema } from "@/utils/validationSchema";

interface Props {
    params: {id: string}
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description Delete profile
 * @access private
 */

export async function DELETE(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)},
            include: {comments: true}
        })
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
              );
        }

        const userFromToken = verifyToken(request)
        if (userFromToken !== null && userFromToken.id === user.id) {
            // delete user
            await prisma.user.delete({where: {id: parseInt(params.id)}})
            // delete comments thats belong to the user
            const commentIds: number[] = user?.comments.map((comment) => comment.id);
            await prisma.comment.deleteMany({where: {id: {in: commentIds}}})
            return NextResponse.json({message: "User deleted successfully"}, {status: 200})
        }

        return NextResponse.json({message: "only user himself can delete his profile"}, {status: 403})

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
    }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @description Get profile by id
 * @access private
 */

export async function GET(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}, select: {id: true, username: true, email: true, createdAt: true, isAdmin: true}})
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 } );
        }
        
        const userFromToken = verifyToken(request)
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json({message:"you are not allowed , access denied"}, {status: 403})
        }

        return NextResponse.json(user, {status: 200})

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
 * @route ~/api/users/profile/:id
 * @description update profile
 * @access private
 */
export async function PUT(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}})
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 } );
        }
        
        const userFromToken = verifyToken(request)
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json({message:"you are not allowed , access denied"}, {status: 403})
        }

        const body = await request.json() as UpdateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        if (body.password) {
            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password, salt)
        }
        const updatedUser = await prisma.user.update({where: {id: parseInt(params.id)},
         data: {username: body.username, email: body.email, password: body.password},
        //  select: {id: true, username: true, email: true, createdAt: true, isAdmin: true}
        })
        const {password, ...outher} = updatedUser // remove password
        return NextResponse.json({...outher}, {status: 200})

    } catch (error) {
        return NextResponse.json( { message: "Something went wrong" }, { status: 500 });
    }
}