import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const CustomeDate = ({dateString}) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const providedDate = new Date(dateString);
      const timeDifference = currentDate - providedDate;

      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

      if (minutes < 1) {
        setFormattedDate('Just now');
      } else if (minutes < 60) {
        setFormattedDate(`${minutes} min ago`);
      } else if (hours < 24) {
        setFormattedDate(`${hours} hours ago`);
      } else if (days < 30) {
        setFormattedDate(`${days} days ago`);
      } else {
        setFormattedDate(providedDate.toDateString());
      }
    };

    calculateTimeDifference();
  }, [dateString]);

  // console.log(formattedDate);
  return (
    <View>
      <Text
        className="text-[#86d957] text-[12px]"
        style={{fontFamily: 'Poppins-Regular'}}>
        {formattedDate}
      </Text>
    </View>
  );
};

export default CustomeDate;
