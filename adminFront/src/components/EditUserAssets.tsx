import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { use } from 'echarts';

interface EditUserAssetsProps {
  userId: string;
}

const EditUserAssets: React.FC<EditUserAssetsProps> = ({ userId }) => {
  const [assets, setAssets] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
					`http://localhost:5252/admin/getUserAssets?userId=${userId}`
				)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setAssets(jsonData.assets);
        console.log(jsonData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Hui
    </div>
  );
};

export default EditUserAssets;
