interface ImageInputProps {
  selectedImage: File | null;
  imagePreview: string | null;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ selectedImage, imagePreview, handleImageSelect }: ImageInputProps) => {
  return (
    <div className="p-8 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors hover:border-gray-400">
      {selectedImage ? (
        <div className="mb-4">
          <div className="mb-2 font-medium text-green-600">✓ 이미지가 선택되었습니다</div>
          <div className="mb-2">
            <img
              src={imagePreview!}
              alt="시간표 미리보기"
              className="mx-auto max-w-full max-h-48 rounded-lg border border-gray-300"
            />
          </div>
          <div className="text-sm text-gray-600">{selectedImage.name}</div>
          <div className="mt-1 text-xs text-gray-500">
            {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <svg
            className="mx-auto w-12 h-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <p className="mb-4 text-sm text-gray-600">
        {selectedImage
          ? '다른 이미지를 선택하려면 클릭하세요'
          : '에브리타임 시간표 캡쳐 이미지를 업로드하세요'}
      </p>

      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md transition-colors hover:bg-gray-800"
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        {selectedImage ? '이미지 변경' : '이미지 선택'}
      </button>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />
    </div>
  );
};

export default ImageInput;
