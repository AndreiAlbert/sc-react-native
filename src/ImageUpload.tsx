import React, { useState, useRef } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ImageUploadProps {
  onImageSelected: (imageBase64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        setSelectedImage(base64String);
        onImageSelected(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <View style={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <TouchableOpacity style={styles.button} onPress={handleSelectImageClick}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'cover',
  },
});

export default ImageUpload;
