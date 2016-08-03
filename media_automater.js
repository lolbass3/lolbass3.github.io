const fs = require('fs'), sizeOf = require('image-size'), glob = require('glob')

glob("resources/img/media/*.jpeg", {}, function(err, files){

  let contents = ''
  const captions = [
    "Ken Ge Photography",
    "Color Crush Photograpy",
    "",
    "KomJazz Photography",
    "Ken Ge Photography",
    "Ken Ge Photography",
    "",
    "KomJazz Photography",
    "Ken Ge Photography",
    "Sam Neufeld",
    "Sam Neufeld",
    "",
    "Color Crush Photograpy",
    "Sam Neufeld",
    "Ken Ge Photography",
    "",
    "KomJazz Photography",
    "Ken Ge Photography",
    "KomJazz Photography",
    "KomJazz Photography"
  ]

  //sort with a custom sort function
  files.sort()
  //console.log(files)
  let i = 0
  for (file of files){
    let dimensions = sizeOf(file)
    console.log(`${file}: ${dimensions.width}x${dimensions.height}`)
    let out = `
      <figure itemprop="associatedMedia" itemtype="http://schema.org/ImageObject" itemscope="">
        <a href="${file}" itemprop="contentUrl" data-size="${dimensions.width}x${dimensions.height}" data-caption="Credits: ${captions[i]}">
          <img class="grid-item" src="${file}" alt="">
        </a>
      </figure>
    `
    contents += out
    i++
  }

  fs.writeFileSync('media_out.html', contents)
})
