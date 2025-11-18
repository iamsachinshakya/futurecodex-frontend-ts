interface UserAvatarProps {
  name: string;
  role: string;
  initials?: string;
}

export function UserAvatar({ name, role, initials }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-700/30">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
        {initials || getInitials(name)}
      </div>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  );
}
