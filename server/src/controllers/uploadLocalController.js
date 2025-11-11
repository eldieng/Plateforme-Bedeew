// @desc    Upload single image (local storage)
// @route   POST /api/upload
// @access  Private
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier fourni'
      });
    }

    // Construire l'URL de l'image
    const imageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images (local storage)
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier fourni'
      });
    }

    const images = req.files.map(file => ({
      url: `${process.env.API_URL}/uploads/${file.filename}`,
      filename: file.filename
    }));

    res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image from local storage
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
export const deleteImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../../uploads', filename);

    // Vérifier si le fichier existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({
        success: true,
        message: 'Image supprimée avec succès'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Fichier non trouvé'
      });
    }
  } catch (error) {
    next(error);
  }
};
