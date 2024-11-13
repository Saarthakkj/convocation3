import Image from 'next/image';

export default function ImageGallery({ data }: { data: typeof JSON[] }) {
    return (
      <>
        {data?.map((photo, index) => 
            <div key={index}>
              <Image
                src={`data:image/jpeg;base64,${photo}`}
                alt={`User ${index}`}
                width={100}
                height={100}
              />
            </div>
        )}
      </>
    );
  }