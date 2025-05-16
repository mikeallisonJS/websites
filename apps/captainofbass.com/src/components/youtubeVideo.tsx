'use client'

type YouTubeVideoProps = {
  videoId: string
}

export function YouTubeVideo({ videoId }: YouTubeVideoProps) {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="aspect-video w-full max-w-3xl">
        <iframe
          className="h-full w-full rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}
