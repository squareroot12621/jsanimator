import {globals} from './globals.js'

function handle_action(command_name) {
  console.log(globals.screen, command_name) // TODO: Do something else
  return false

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

export {handle_action}
