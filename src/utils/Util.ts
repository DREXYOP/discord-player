import { StageChannel, VoiceChannel } from "discord.js";
import { TimeData } from "../types/types";

class Util {
    static durationString(durObj: object) {
        return Object.values(durObj)
            .map((m) => (isNaN(m) ? 0 : m))
            .join(":");
    }

    static parseMS(milliseconds: number) {
        const round = milliseconds > 0 ? Math.floor : Math.ceil;

        return {
            days: round(milliseconds / 86400000),
            hours: round(milliseconds / 3600000) % 24,
            minutes: round(milliseconds / 60000) % 60,
            seconds: round(milliseconds / 1000) % 60
        } as TimeData;
    }

    static buildTimeCode(duration: TimeData) {
        const items = Object.keys(duration);
        const required = ["days", "hours", "minutes", "seconds"];

        const parsed = items.filter((x) => required.includes(x)).map((m) => (duration[m as keyof TimeData] > 0 ? duration[m as keyof TimeData] : ""));
        const final = parsed
            .filter((x) => !!x)
            .map((x) => x.toString().padStart(2, "0"))
            .join(":");
        return final.length <= 3 ? `0:${final.padStart(2, "0") || 0}` : final;
    }

    static last<T = any>(arr: T[]): T {
        if (!Array.isArray(arr)) return;
        return arr[arr.length - 1];
    }

    static isVoiceEmpty(channel: VoiceChannel | StageChannel) {
        return channel.members.filter((member) => !member.user.bot).size === 0;
    }

    static require(id: string) {
        try {
            return require(id);
        } catch {
            return null;
        }
    }

    static wait(time: number) {
        return new Promise((r) => setTimeout(r, time).unref());
    }
}

export { Util };
