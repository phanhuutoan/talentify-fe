type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>Blog: {id} </h1>
    </div>
  );
}
