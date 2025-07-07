import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  console.log(`current_file #3: ${JSON.stringify(globals.current_file)}`)
  console.log(`current_file keys #3: ${JSON.stringify(Object.keys(globals.current_file))}`)
  var title = create_element('h1', globals.current_file['Test1 - Copy/svgs/rectangle.svg'].slice(0, 50))

  update_root(title)

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
