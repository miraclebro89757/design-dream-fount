import { Header } from "@/components/header"
import { MindMapCreator } from "@/components/mind-map-creator"
import { Footer } from "@/components/footer"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <MindMapCreator />
      </main>
      <Footer />
    </div>
  )
}
