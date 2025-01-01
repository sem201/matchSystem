import { useState } from "react";

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [discordWebhook, setDiscordWebhook] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 비밀번호 정규식 (최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setErrorMessage("비밀번호는 최소 8자, 대소문자, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    // 유효성 검사 성공 시, 회원가입 처리
    console.log("회원가입 정보:", { id, password, email, discordWebhook, address });

    // 모달 닫기
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium">아이디</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="discordWebhook" className="block text-sm font-medium">디스코드 웹훅 URL</label>
            <input
              type="url"
              id="discordWebhook"
              value={discordWebhook}
              onChange={(e) => setDiscordWebhook(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">주소</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* 에러 메시지 */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
