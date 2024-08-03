"use client"
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
    const [userSeachInput, setUerSearchInout] = useState<string>()
    return (
        <div>

            <SearchSection onSearchInput={(value: string) => setUerSearchInout(value)} />

            <TemplateListSection  userSeachInput={userSeachInput} />

        </div>
    )
}

export default Dashboard