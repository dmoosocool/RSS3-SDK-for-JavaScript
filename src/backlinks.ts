import Main from './index';
import utils from './utils';

class Backlinks {
    private main: Main;

    constructor(main: Main) {
        this.main = main;
    }

    private async getPosition(persona: string, id: string) {
        const file = <RSS3Index>await this.main.files.get(persona);
        const index = (file.backlinks || []).findIndex((lks) => lks.id === id);
        return {
            file,
            index,
            fileID: index !== -1 ? file.backlinks![index].list : null,
        };
    }

    async getListFile(persona: string, id: string, index = -1) {
        return <RSS3BacklinksList | null>await this.main.files.getList(persona, 'backlinks', index, id);
    }

    async getList(persona: string, id: string, breakpoint?: (file: RSS3BacklinksList) => boolean) {
        const { fileID } = await this.getPosition(persona, id);
        const listFile = fileID || utils.id.getBacklinks(persona, id, 0);
        return <RSS3ID[]>await this.main.files.getAll(listFile, (file) => {
            return breakpoint?.(<RSS3BacklinksList>file) || false;
        });
    }
}

export default Backlinks;
