'use babel';

import { CompositeDisposable } from 'atom';
import colorNamer from 'color-namer';

export default {

  selection: "",

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'name-that-color:name-selection': () => this.nameSelection()
    }));
    
    atom.workspace.observeTextEditors((editor) => {
      editor.observeSelections((selection) => {
        this.selection = selection;
      })
    })    
  },
  
  nameSelection() {
    let text = this.selection.getText();
    if(!this.selection.isEmpty()) {
      try {
        let names = colorNamer(text);
        let result = names.html[0].name;
        this.selection.insertText(`${result} ${text}`);
      } catch(e) {
        atom.notifications.addError("Invalid Color Code", {description: text})
      }
    }
  }
};

