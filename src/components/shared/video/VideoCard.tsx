import Image from "next/image";
import ChannelAvatar from "@/components/channel/ChannelAvatar";

interface VideoCardProps {
  thumbnailUrl: string;
  title: string;
  avatar?: string;
  channelName?: string;
  videoSize: string;
  dateDownloaded: string;
  showAvatar?: boolean;
}

export default function VideoCard({
  thumbnailUrl,
  title,
  avatar,
  channelName,
  videoSize,
  dateDownloaded,
}: VideoCardProps) {
  return (
    <div className="flex flex-col gap-3 w-[350px]">
      <VideoThumbnail thumbnailUrl={thumbnailUrl} />

      <div className="flex gap-3 items-start">
        {avatar && <ChannelAvatar avatarUrl={avatar} size={40} />}

        <VideoInformation
          videoTitle={title}
          channelName={channelName}
          videoSize={videoSize}
          dateDownloaded={dateDownloaded}
        />
      </div>
    </div>
  );
}

interface VideoInformationProps {
  videoTitle: string;
  channelName?: string;
  videoSize: string;
  dateDownloaded: string;
}

function VideoInformation({
  videoTitle,
  channelName = "",
  videoSize,
  dateDownloaded,
}: VideoInformationProps) {
  return (
    <div className="flex flex-col gap-1 text-xs max-w-[80%]">
      <p className="text-white text-xs">{videoTitle}</p>

      <VideoMeta
        channelName={channelName}
        videoSize={videoSize}
        dateDownloaded={dateDownloaded}
      />
    </div>
  );
}

interface VideoMetaProps {
  channelName?: string;
  videoSize: string;
  dateDownloaded: string;
}

function VideoMeta({ channelName, videoSize, dateDownloaded }: VideoMetaProps) {
  return (
    <div className="flex gap-1 text-[#676D75]">
      {channelName && (
        <>
          <p>@{channelName}</p>
          <p>•</p>
        </>
      )}
      <p>{videoSize}</p>
      <p>•</p>
      <p>{dateDownloaded}</p>
    </div>
  );
}

interface VideoThumbnailProps {
  thumbnailUrl: string;
  width?: number;
  height?: number;
}

function VideoThumbnail({ thumbnailUrl, width, height }: VideoThumbnailProps) {
  return (
    <Image
      priority
      src={thumbnailUrl}
      height={height ? height : 0}
      width={width ? width : 350}
      alt={"video thumbnail"}
    />
  );
}
