const YOUR_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export const getStaticPaths = async () => {
    // Fetch the list of images or identifiers from Cloudinary
    const res = await fetch(`https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/resources/image`);
    const data = await res.json();
  
    // Map the data to paths
    const paths = data.resources.map((image: any, index: number) => ({
      params: { id: image.public_id, index: index.toString() },
    }));
  
    return { paths, fallback: false };
  };
  
  export const getStaticProps = async ({ params }: { params: any }) => {
    // Fetch the specific image data from Cloudinary using the id
    const res = await fetch(`https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/image/upload/${params?.id}`);
    const image = await res.json();
  
    return {
      props: {
        image,
      },
    };
  };