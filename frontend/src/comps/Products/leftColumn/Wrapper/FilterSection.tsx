import React from 'react'
import { FaChevronUp } from 'react-icons/fa';

    const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
        title,
        children,
    }) => (
        <div className="py-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <FaChevronUp className="text-gray-500" />
            </div>
            <div>{children}</div>
        </div>
    );

export default FilterSection
