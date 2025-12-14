/** @format */


const AboutPage =async () => {
  await new Promise((resolve => setTimeout(resolve, 5000)));
  return (
    <section className="fix-height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">About This App</h1>
      <p className="px-5 text-gray-600 text-xl">
        The best web hosting solution for your online success
      </p>
    </section>
  );
};

export default AboutPage;
