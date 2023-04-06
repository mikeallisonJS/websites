const { src, dest } = require('gulp')
const sharpResponsive = require('gulp-sharp-responsive')

const compress = () => {
  const projects = [
    'captainofbass.com',
    'members.captainssounds.com',
    'offer.captainssounds.com',
    'sltdnb.com'
  ]
  projects.forEach((project) => {
    const folders = ['images', 'flyers', 'products']
    folders.forEach((folder) =>
      src(`packages/${project}/src/assets/${folder}/*.{png,jpg,jpeg,JPG}`)
        .pipe(
          sharpResponsive({
            formats: [
              // // jpeg
              // { width: 256, format: "jpeg", rename: { suffix: "-256" } },
              // { width: 512, format: "jpeg", rename: { suffix: "-512" } },
              { width: 1024, format: 'jpeg', rename: { suffix: '-1024' } },
              // webp
              { width: 256, format: 'webp', rename: { suffix: '-256' } },
              { width: 512, format: 'webp', rename: { suffix: '-512' } },
              { width: 1024, format: 'webp', rename: { suffix: '-1024' } }
            ]
          })
        )
        .pipe(dest(`packages/${project}/src/assets/compressed/${folder}`))
    )
  })
}

module.exports = {
  compress
}
