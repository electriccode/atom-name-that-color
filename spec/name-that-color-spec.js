'use babel';

import NameThatColor from '../lib/name-that-color';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('NameThatColor', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('name-that-color');
  });

  describe('when the name-that-color:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.name-that-color')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'name-that-color:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.name-that-color')).toExist();

        let nameThatColorElement = workspaceElement.querySelector('.name-that-color');
        expect(nameThatColorElement).toExist();

        let nameThatColorPanel = atom.workspace.panelForItem(nameThatColorElement);
        expect(nameThatColorPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'name-that-color:toggle');
        expect(nameThatColorPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.name-that-color')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'name-that-color:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let nameThatColorElement = workspaceElement.querySelector('.name-that-color');
        expect(nameThatColorElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'name-that-color:toggle');
        expect(nameThatColorElement).not.toBeVisible();
      });
    });
  });
});
