export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
      <p className="mt-4 text-muted-foreground">Sorry, something went wrong with authentication.</p>
    </div>
  )
}
