import Account from './account/index';
import Files from './files';
import Profile from './profile/index';
import Items from './items/index';
import Links from './links';
import Backlinks from './backlinks';
import Assets from './assets/index';
import utils from './utils';

export { utils };

interface IOptions {
    endpoint: string;
    agentSign?: boolean;
    agentStorage?: {
        set: (key: string, value: string) => Promise<void>;
        get: (key: string) => Promise<string>;
    };
}

export interface IOptionsMnemonic extends IOptions {
    mnemonic?: string;
    mnemonicPath?: string;
}

export interface IOptionsPrivateKey extends IOptions {
    privateKey: string;
}

export interface IOptionsSign extends IOptions {
    address: string;
    sign: (data: string) => Promise<string>;
}

class RSS3 {
    options: IOptionsMnemonic | IOptionsPrivateKey | IOptionsSign;
    account: Account;
    files: Files;
    profile: Profile;
    items: Items;
    links: Links;
    backlinks: Backlinks;
    assets: Assets;

    constructor(options: IOptionsMnemonic | IOptionsPrivateKey | IOptionsSign) {
        this.options = options;

        this.files = new Files(this);
        this.account = new Account(this);
        this.profile = new Profile(this);
        this.items = new Items(this);
        this.links = new Links(this);
        this.backlinks = new Backlinks(this);
        this.assets = new Assets(this);
    }
}

export default RSS3;
