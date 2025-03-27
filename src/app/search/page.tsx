export default async function Page(searchParams: Promise<{ q: string }>) {
  const { q } = await searchParams;
  return <>search Page</>;
}
