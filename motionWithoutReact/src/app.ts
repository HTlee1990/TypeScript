import { Component } from './components/component.js';
import {
  InputDialog,
  TextData,
  MediaData,
} from './components/dialog/dialog.js';
import { MediaSectioninput } from './components/dialog/input/media-input.js';
import { TextSectioninput } from './components/dialog/input/text-input.js';
import { ImgageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // const image = new ImgageComponent(
    //   'https://picsum.photos/600/300',
    //   'ImageTitle'
    // );
    // this.page.addChild(image);

    // const video = new VideoComponent(
    //   'https://www.youtube.com/watch?v=bP9gMpl1gyQ',
    //   'youtube embeded url test'
    // );
    // this.page.addChild(video);

    // const note = new NoteComponent(
    //   'This is body of the note',
    //   'this is title of the note'
    // );
    // this.page.addChild(note);

    this.page.addChild(
      new ImgageComponent('imageTitle', 'https://picsum.photos/600/300')
    );
    this.page.addChild(
      new VideoComponent(
        'video title',
        'https://www.youtube.com/watch?v=bP9gMpl1gyQ'
      )
    );
    this.page.addChild(new NoteComponent('note title', 'note body'));
    this.page.addChild(new TodoComponent('todo title', 'todobody'));
    this.page.addChild(
      new ImgageComponent('imageTitle', 'https://picsum.photos/600/300')
    );
    this.page.addChild(
      new VideoComponent(
        'video title',
        'https://www.youtube.com/watch?v=bP9gMpl1gyQ'
      )
    );
    this.page.addChild(new NoteComponent('note title', 'note body'));
    this.page.addChild(new TodoComponent('todo title', 'todobody'));

    this.bindElementToDialog<MediaSectioninput>(
      '#new-image',
      MediaSectioninput,
      (input: MediaSectioninput) => new ImgageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectioninput>(
      '#new-video',
      MediaSectioninput,
      (input: MediaSectioninput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectioninput>(
      '#new-note',
      TextSectioninput,
      (input: TextSectioninput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectioninput>(
      '#new-todo',
      TextSectioninput,
      (input: TextSectioninput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new inputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListner(() => dialog.removeFrom(this.dialogRoot));
      dialog.setOnSubmitListner(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
