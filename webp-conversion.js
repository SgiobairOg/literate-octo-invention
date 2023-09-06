import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp';

const outputFolder = "./public/img"; // Output folder
const images = "./public/img/*.{jpg,png}"; // image sources

imagemin([images], {
  destination: outputFolder,
  plugins: [
    imageminWebp({
      lossless: true // Losslessly encode images
    })
  ]
});
