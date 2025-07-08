import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  var nav_bar_element_titles = ["File", "Edit", "Preview"]
  var nav_bar_elements = nav_bar_element_titles.map(
    (name) => create_element('div', name, {class: 'navbarbutton'})
  )
  var nav_bar = create_element('nav', nav_bar_elements, {id: 'navbar'})

  var editing_container = create_element('div', nav_bar, {id: 'editingcontainer'})

  update_root(editing_container)

  /* Export zip file with name
  
  zip.generateAsync({
    type: "base64"
  }).then(function(content) {
    var link = document.createElement('a');
    link.href = "data:application/zip;base64," + content;
    link.download = "your-file-name.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  */
}

export {create_editing_screen}
