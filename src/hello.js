import {
  Component,
  Template,
  bootstrap,
  If,
  For,
  Parent
} from 'angular2/angular2';

@Component({
    selector: 'hello'
})
@Template({
    inline: `
      <tabs>
        <tab [tab-title]="'Tab 1'">Tab 1 Content</tab>
        <tab tab-title="Tab 2">Tab 2 Content</tab>
      </tabs>
    `,
    directives: [Tabs, Tab]
})
export class Hello { }

@Component({
  selector: 'tabs'
})
@Template({
  inline: `
    <ul>
      <li *for="#tab of tabs" (click)="selectTab(tab)">{{tab.tabTitle}}</li>
    </ul>
    <content></content>
  `,
  directives: [For]
})
export class Tabs {
  constructor() {
    this.tabs = [];
  }

  selectTab(tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'tab',
  bind: {
    'tabTitle': 'tab-title'
  }
})
@Template({
  inline: `
    <div [hidden]="!active">
      <content></content>
    </div>
  `
})
export class Tab {
  constructor(@Parent() tabs:Tabs) {
    tabs.addTab(this);
  }
}

bootstrap(Hello);
