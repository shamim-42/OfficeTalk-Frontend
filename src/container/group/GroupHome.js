import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroupInfo } from "../../api/group";
import { selectUserProfile } from "../../redux/features/authSlice";
import GroupHomeUI from "../../ui/group/GroupHomeUI";

const GroupHome = () => {
  let { id } = useParams();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false)

  // get current group information
  const getCurrentGroupInfo = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res[0]);
      setGroupInfo(res[0]);
      setLoading(false);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      setLoading(false);
    }
    return await getGroupInfo(id, userId, { successHandler, handleBadReq })
  }, [id, userId]);

  useEffect(() => {
    getCurrentGroupInfo()
  }, [getCurrentGroupInfo])

  return (
    <Spin spinning={loading}>
      <GroupHomeUI
        groupInfo={groupInfo}
      />
    </Spin>
  );
};

export default GroupHome;