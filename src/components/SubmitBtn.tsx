import { useNavigation } from "react-router-dom";

type SubmitBtnProps = {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SubmitBtn = ({ text, size }: SubmitBtnProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const btnSize = size ? `btn-${size}` : 'btn-md';

  return (
    <button type="submit"
            className={`btn btn-primary btn-block uppercase ${btnSize}`}
            disabled={isSubmitting}
    >
      {
        isSubmitting
          ? <><span className="loading loading-spinner"></span> Sending...</>
          : text ?? 'Submit'
      }

    </button>
  );
};

export default SubmitBtn;
