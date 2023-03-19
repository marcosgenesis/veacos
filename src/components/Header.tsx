import { Profile } from "./Sidebar/Profile";
interface HeaderProps {
  children: React.ReactNode;
}
export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="mx-4 flex flex-col items-center justify-between rounded-md border-[1px] border-gray-100 p-4 shadow-sm md:flex-row">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-gray-600">Bem vindo novamente 👋</p>
        <Profile />
      </div>
      {children}
    </div>
  );
};
