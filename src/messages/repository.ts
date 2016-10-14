export type Message = {
  id: number;
  folder: string;
  text: string;
};

export class Repository {
  pageSize: {[k:string]:number} = {inbox: 10, draft: 10};

  messages: Message[] = [
    {id: 1, folder: 'inbox', text: 'Message 1 from Inbox'},
    {id: 2, folder: 'inbox', text: 'Message 2 from Inbox'},
    {id: 3, folder: 'inbox', text: 'Message 3 from Inbox'},
    {id: 4, folder: 'inbox', text: 'Message 4 from Inbox'},
    {id: 5, folder: 'inbox', text: 'Message 5 from Inbox'},
    {id: 6, folder: 'inbox', text: 'Message 6 from Inbox'},
    {id: 7, folder: 'inbox', text: 'Message 7 from Inbox'},
    {id: 8, folder: 'inbox', text: 'Message 8 from Inbox'},
    {id: 9, folder: 'inbox', text: 'Message 9 from Inbox'},
    {id: 10, folder: 'inbox', text: 'Message 10 from Inbox'},
    {id: 11, folder: 'inbox', text: 'Message 11 from Inbox'},
    {id: 12, folder: 'inbox', text: 'Message 12 from Inbox'},
    {id: 13, folder: 'inbox', text: 'Message 13 from Inbox'},
    {id: 14, folder: 'inbox', text: 'Message 14 from Inbox'},
    {id: 15, folder: 'inbox', text: 'Message 15 from Inbox'},

    {id: 16, folder: 'draft', text: 'Message 1 from Drafts'},
    {id: 17, folder: 'draft', text: 'Message 2 from Drafts'},
    {id: 18, folder: 'draft', text: 'Message 3 from Drafts'},
    {id: 19, folder: 'draft', text: 'Message 4 from Drafts'},
    {id: 20, folder: 'draft', text: 'Message 5 from Drafts'},
  ];

  get folders(): string[] {
    return ['inbox', 'draft'];
  }

  messagesFor(folder: string): Message[] {
    const filtered = this.messages.filter(m => m.folder === folder);
    return filtered.slice(0, this.pageSize[folder]);
  }

  message(id: number): Message {
    return this.messages.filter(m => m.id === id)[0];
  }
}