import { useState } from "react";

// Components
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab } from "@mui/material";
import { AllPosts, SalePosts } from "./components";

export function Posts() {
  const [value, setValue] = useState("posts");

  function handleChange(_, newValue) {
    setValue(newValue);
  }

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        TabIndicatorProps={{ sx: { display: "none" } }}
        sx={{
          borderTopWidth: "1px",
          borderTopColor: "custom.black",
          borderTopStyle: "solid",
          ".MuiTabs-flexContainer": { justifyContent: "center" },
          ".MuiTab-root": { textTransform: "none", color: "custom.black" },
          "&&& .Mui-selected": { color: "custom.black", fontWeight: 800 },
        }}
      >
        <Tab label="Posts" value="posts" />
        {/* <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            borderColor: "custom.black",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        /> */}
        <Tab label="On Sale" value="sale" />
      </TabList>
      <TabPanel value="posts" sx={{ padding: "10px 0 10px 0" }}>
        <AllPosts />
      </TabPanel>
      <TabPanel value="sale" sx={{ padding: "10px 0 10px 0" }}>
        <SalePosts />
      </TabPanel>
    </TabContext>
  );
}
