package main

import (
	"encoding/json"
	"os/exec"

	log "github.com/sirupsen/logrus"
)

func GetLatestVideo(channelName, channelType string) string {
	if channelType == "user" {
		cmd := exec.Command("youtube-dl", "-j", "--playlist-end", "1", "https://www.youtube.com/user/"+channelName)
		out, err := cmd.CombinedOutput()
		if err != nil {
			log.Fatal(string(out))
		}
		metaData := &ChannelInformation{}
		if err = json.Unmarshal(out, metaData); err != nil {
			log.Fatal(err)
		}

		return metaData.ID
	}
	cmd := exec.Command("youtube-dl", "-j", "--playlist-end", "1", "https://www.youtube.com/channel/"+channelName)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(string(out))
	}
	metaData := &ChannelInformation{}
	if err = json.Unmarshal(out, metaData); err != nil {
		log.Fatal(err)
	}

	return metaData.ID
}

func DownloadYTDL(videoId string) error {
	// youtube-dl -o '%(uploader)s/ - %(title)s.%(ext)s' https://www.youtube.com/watch\?v\=i3o4G4bmqPc

	// cmd := exec.Command("youtube-dl", "https://www.youtube.com/watch?v="+videoId)
	cmd := exec.Command("youtube-dl", "-o", "%(uploader)s/ %(title)s.%(ext)s", "https://www.youtube.com/watch?v="+videoId)

	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(string(out))
		return err
	}

	return nil
}

func DownloadAudioYTDL(videoId string) error {
	cmd := exec.Command("youtube-dl", "--extract-audio", "--audio-format", "mp3", "-o", "%(uploader)s/ %(title)s.%(ext)s", "https://www.youtube.com/watch?v="+videoId)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(string(out))
		return err
	}

	return nil
}
