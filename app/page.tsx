import Home from "./pages/Home";

export default function Page({
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <Home />
}