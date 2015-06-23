import {
  ComponentAnnotation as Component,
  ViewAnnotation as View,
  bootstrap,
  NgFor,
  Parent
} from 'angular2/angular2';

@Component({
    selector: 'hello'
})
@View({
    template: `
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
@View({
  template: `
    <ul>
      <li *ng-for="#tab of tabs" (click)="selectTab(tab)">{{tab.tabTitle}}</li>
    </ul>
    <content></content>
  `,
  directives: [NgFor]
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
  properties: ['tabTitle: tab-title']
})
@View({
  template: `
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
