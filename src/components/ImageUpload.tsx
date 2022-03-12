import styled from "@emotion/styled";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { compressImage, toFile } from "@src/utils/files";

interface IProps {
  image?: string;
  onChange: (image: File) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const Root = styled.div<{ image?: string }>`
  position: relative;

  .upload-btn-wrapper {
    border-radius: 0 0 25px 25px;
    position: relative;
    background: #0500ff;
    height: 207px;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 207px;
    color: #ffffff;
  }

  .upload-btn-wrapper input[type="file"] {
    cursor: pointer;
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
    bottom: -25px;
  }
`;

const Icon = () => (
  <svg
    width="58"
    height="58"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="56" height="56" fill="#C6C9F4" />
    <path
      d="M29.0098 39.3711C30.1816 39.3711 30.9238 38.5312 30.9238 37.3203V30.9141H36.9785C38.1699 30.9141 39.0098 30.1914 39.0098 29.0195C39.0098 27.8477 38.1699 27.1055 36.9785 27.1055H30.9238V20.6797C30.9238 19.4688 30.1816 18.6289 29.0098 18.6289C27.8184 18.6289 27.0762 19.4688 27.0762 20.6797V27.1055H21.002C19.8105 27.1055 18.9902 27.8477 18.9902 29.0195C18.9902 30.1914 19.8105 30.9141 21.002 30.9141H27.0762V37.3203C27.0762 38.5312 27.8184 39.3711 29.0098 39.3711Z"
      fill="#8082C5"
    />
    <path
      d="M13 1.5H45V0.5H13V1.5ZM56.5 13V45H57.5V13H56.5ZM45 56.5H13V57.5H45V56.5ZM1.5 45V13H0.5V45H1.5ZM13 56.5C6.64873 56.5 1.5 51.3513 1.5 45H0.5C0.5 51.9036 6.09644 57.5 13 57.5V56.5ZM56.5 45C56.5 51.3513 51.3513 56.5 45 56.5V57.5C51.9036 57.5 57.5 51.9036 57.5 45H56.5ZM45 1.5C51.3513 1.5 56.5 6.64873 56.5 13H57.5C57.5 6.09644 51.9036 0.5 45 0.5V1.5ZM13 0.5C6.09644 0.5 0.5 6.09644 0.5 13H1.5C1.5 6.64873 6.64873 1.5 13 1.5V0.5Z"
      fill="#F1F2FE"
    />
  </svg>
);

const ImageUpload: React.FC<IProps> = ({ onChange, image, ...rest }) => {
  const alert = useAlert();
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const handleChange = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files || !files[0]) return;
    const file: File = files[0];
    if (!/(gif|jpe?g|tiff?|png|bmp)$/i.test(file.type)) {
      alert.error("Пожалуйста, выберите, файлы другого расширения");
    }
    rest.setLoading(true);
    try {
      // @ts-ignore
      const b64 = await toBase64(file);
      const compressed = await compressImage(b64);
      setBase64Photo(compressed);
      onChange && (await onChange(toFile(compressed)));
      rest.setLoading(false);
    } catch (e: any) {
      rest.setLoading(false);
    }
  };
  return (
    <Root>
      <div
        className="upload-btn-wrapper"
        style={{
          backgroundImage:
            image != null && !rest.loading
              ? `url(${base64Photo ?? image})`
              : "background: rgba(0, 0, 0, 0.3)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {rest.loading && <div>loading</div>}
        <Icon />
        <div className="btn">
          <input
            accept="image/*"
            disabled={rest.loading}
            type="file"
            name="file"
            onChange={handleChange}
          />
        </div>
      </div>
    </Root>
  );
};
export default ImageUpload;
