import React, { useEffect } from "react";
import type ISplitExpenceUser from "./ISplitExpenceUser";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

const SplitExpenceUser: React.FC<ISplitExpenceUser> = ({ users, totalAmount, splitType, splitArr, setSplitArr , setSplitType }) => {
    

    const getDefaultShareValue = (type: ISplitExpenceUser["splitType"]): string => {
        switch (type) {
            case "ratio":
                return "1";
            case "percentage":
                return users.length ? (100 / users.length).toFixed(0) : "0";
            case "custom":
                return "0";
            case "equal":
            default:
                return "1";
        }
    };

    const parseNumericValue = (value: string, fallback = 0): number => {
        const parsedValue = Number(value);

        return Number.isFinite(parsedValue) ? parsedValue : fallback;
    };

    const activeUsers = splitArr.filter((item) => item.isActive);
    const activeUserCount = activeUsers.length;
    const totalRatio = activeUsers.reduce((sum, item) => sum + parseNumericValue(item.shareValue, 1), 0);

    const generateAmount = (splitArrItem: ISplitExpenceUser["splitArr"][0]): string => {
        if (!splitArrItem.isActive) {
            return "0.00";
        }

        switch (splitType) {
            case "equal":
                return activeUserCount ? (totalAmount / activeUserCount).toFixed(2) : "0.00";
            case "ratio": {
                const ratioValue = parseNumericValue(splitArrItem.shareValue, 1);
                return totalRatio ? ((totalAmount * ratioValue) / totalRatio).toFixed(2) : "0.00";
            }
            case "percentage": {
                const percentageValue = parseNumericValue(splitArrItem.shareValue, 0);
                return ((totalAmount * percentageValue) / 100).toFixed(2);
            }
            case "custom":
                return parseNumericValue(splitArrItem.shareValue, 0).toFixed(2);
            default:
                return "0.00";
        }
    };

    const updateShareValue = (id: number, value: string) => {
        setSplitArr((prev) => prev.map((item) => item.id === id ? { ...item, shareValue: value } : item));
    };

    const genrateOptionDependOnSplitType = (splitArrItem: ISplitExpenceUser["splitArr"][0]) => {
        if (!splitArrItem.isActive) {
            return <span className="text-xs text-[#64748b]">Inactive</span>;
        }

        switch (splitType) {
            case "equal": {
                return (
                    <span className="inline-flex rounded-md border border-[#475569] px-2.5 py-1 text-xs font-medium text-[#cbd5e1]">
                        1/{activeUserCount || 1}
                    </span>
                );
            }
            case "ratio": {
                return (
                    <select
                        value={splitArrItem.shareValue}
                        onChange={(e) => updateShareValue(splitArrItem.id, e.target.value)}
                        className="w-20 rounded-md border border-[#475569] bg-transparent px-2 py-1 text-xs font-medium text-[#e2e8f0] outline-none"
                    >
                        <option value="1" className="bg-[#0b1120] text-[#e2e8f0]">1x</option>
                        <option value="2" className="bg-[#0b1120] text-[#e2e8f0]">2x</option>
                        <option value="3" className="bg-[#0b1120] text-[#e2e8f0]">3x</option>
                        <option value="4" className="bg-[#0b1120] text-[#e2e8f0]">4x</option>
                    </select>
                );
            }
            case "percentage": {
                return (
                    <select
                        value={splitArrItem.shareValue}
                        onChange={(e) => updateShareValue(splitArrItem.id, e.target.value)}
                        className="w-20 rounded-md border border-[#475569] bg-transparent px-2 py-1 text-xs font-medium text-[#e2e8f0] outline-none"
                    >
                        <option value="10" className="bg-[#0b1120] text-[#e2e8f0]">10%</option>
                        <option value="25" className="bg-[#0b1120] text-[#e2e8f0]">25%</option>
                        <option value="50" className="bg-[#0b1120] text-[#e2e8f0]">50%</option>
                        <option value="75" className="bg-[#0b1120] text-[#e2e8f0]">75%</option>
                        <option value="100" className="bg-[#0b1120] text-[#e2e8f0]">100%</option>
                    </select>
                );
            }
            case "custom": {
                return (
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={splitArrItem.shareValue}
                        onChange={(e) => updateShareValue(splitArrItem.id, e.target.value)}
                        className="w-20 rounded-md border border-[#475569] bg-transparent px-2 py-1 text-xs font-medium text-[#e2e8f0] outline-none"
                    />
                );
            }
            default: {
                return null;
            }
        }
    };

    useEffect(() => {
        setSplitArr((prev) => {
            const previousById = new Map(prev.map((item) => [item.id, item]));

            return users.map((user) => {
                const previousItem = previousById.get(user.userId);

                return {
                    id: user.userId,
                    name: user.userName,
                    isActive: previousItem?.isActive ?? true,
                    shareValue: previousItem?.shareValue ?? getDefaultShareValue(splitType),
                };
            });
        });
    }, [users]);

    useEffect(() => {
        setSplitArr((prev) => prev.map((item) => ({
            ...item,
            shareValue: getDefaultShareValue(splitType),
        })));
    }, [splitType]);

    function toggleUserActive(index: number): void {
        setSplitArr((prev) => prev.map((item, i) => i === index ? { ...item, isActive: !item.isActive } : item));
    }

    return (
        <section className="mt-3 overflow-hidden rounded-lg border border-[#334155]">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="border-b border-[#334155]">
                        <tr>
                            <th className="px-3 py-2 text-left text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#93c5fd]">User</th>
                            <th className="px-3 py-2 text-left text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#93c5fd]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[0.65rem]">Type</span>
                                    <select
                                        value={splitType}
                                        onChange={(e) => setSplitType(e.target.value as "equal" | "ratio" | "percentage" | "custom")}
                                        className="w-20 rounded-md border border-[#475569] bg-transparent px-2 py-0.5 text-[0.7rem] font-medium text-[#e2e8f0] outline-none"
                                    >
                                        <option value="equal" className="bg-[#0b1120] text-[#e2e8f0]">Equal</option>
                                        <option value="ratio" className="bg-[#0b1120] text-[#e2e8f0]">Ratio</option>
                                        <option value="percentage" className="bg-[#0b1120] text-[#e2e8f0]">Percentage</option>
                                        <option value="custom" className="bg-[#0b1120] text-[#e2e8f0]">Custom</option>
                                    </select>
                                </div>
                            </th>
                            <th className="px-3 py-2 text-right text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#93c5fd]">Amount</th>
                            <th className="px-3 py-2 text-right text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#93c5fd]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {splitArr.map((user, index) => (
                            <tr key={`${user.id}-${index}-splitwiseUser`} className={`border-b border-[#1e293b] last:border-b-0 ${user.isActive ? "hover:bg-white/2" : "opacity-50"}`}>
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#334155] text-[#bfdbfe]">
                                            <FaRegUser className="text-xs" />
                                        </span>
                                        <span className="text-xs font-medium text-[#f8fafc]">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    {genrateOptionDependOnSplitType(user)}
                                </td>
                                <td className="px-3 py-2 text-right text-xs font-medium text-[#e2e8f0]">
                                    {generateAmount(user)}
                                </td>
                                <td className="px-3 py-2 text-right text-xs font-medium text-[#e2e8f0]">
                                    <button type="button" className={`cursor-pointer ${user.isActive ? "text-[#f87171]" : "text-[#64748b]"}`} onClick={() => toggleUserActive(index)}>
                                        <AiOutlineStop className="inline-block text-base" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SplitExpenceUser;