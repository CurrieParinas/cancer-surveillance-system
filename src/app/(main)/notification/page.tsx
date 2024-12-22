"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Notification {
  notifLogID: number;
  notificationDate: string;
  notificationSender: {
    userFirstname: string;
    userLastname: string;
  };
  notificationNotes: string;
}

type NotificationSender = {
  userFirstname: string;
  userLastname: string;
};

type NotificationType = {
  notifLogID: number;
  notificationDate: string; // ISO date string
  notificationSender: NotificationSender;
  notificationNotes: string;
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}css/notif/log/${parsedUserData.user.userId}/all`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          const parsedData = data.map((item: NotificationType) => ({
            notifLogID: item.notifLogID,
            notificationDate: new Date(item.notificationDate).toISOString().split("T")[0],
            notificationSender: {
              userFirstname: item.notificationSender.userFirstname,
              userLastname: item.notificationSender.userLastname,
            },
            notificationNotes: item.notificationNotes,
          }));
          setNotifications(parsedData);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
    }

    fetchNotifications();
  }, []);

  const [userInfo, setUserInfo] = useState({
    userFirstname: '',
    userLastname: '',
    role: '',
    email: '',
  });

  useEffect(() => {
    const setFormDetails = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if ('doctorId' in parsedUserData) {
          setUserInfo({
            userFirstname: parsedUserData.user.userFirstname,
            userLastname: parsedUserData.user.userLastname,
            role: 'Doctor',
            email: parsedUserData.user.userEmail,
          });
        } else if ('patientId' in parsedUserData) {
          setUserInfo({
            userFirstname: parsedUserData.user.userFirstname,
            userLastname: parsedUserData.user.userLastname,
            role: 'Patient',
            email: parsedUserData.user.userEmail,
          });
        }
      }
    };

    setFormDetails();
  }, [])

  return (
    <div className="w-5/6 bg-white flex flex-col items-center px-6 h-screen">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap	tracking-wide">ALERT</p>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-4xl h-3/6 bg-white p-6 overflow-y-auto">
        <Table>
          <TableHeader className=" ">
            <TableRow className="bg-red-50 hover:bg-red-100">
              <TableHead className="font-medium text-sm text-gray-700 py-3 w-1/5">
                Date
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-700 py-3 w-1/5">
                Sender
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-700 py-3 w-3/5 text-center">
                Message
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <TableRow key={notification.notifLogID}>
                  <TableCell className="text-sm text-gray-700 bg-white py-2">
                    {notification.notificationDate}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 bg-white py-2">
                    {`${notification.notificationSender.userFirstname} ${notification.notificationSender.userLastname}`}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 bg-white py-2">
                    {notification.notificationNotes}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  rowSpan={3}
                  colSpan={3}
                  className="text-sm text-gray-700 bg-white py-2 text-center items-center"
                >
                  No emails received.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>

      {/* System Message Section */}
      {userInfo.role === "Doctor" && (
        <div className="w-full max-w-4xl mt-8 bg-white p-6">
          <div className="mb-4">
            <p className="font-semibold text-lg text-gray-800">
              SYSTEM MESSAGE:
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-md">
            <div className="space-y-4 flex">
              <p className="font-medium text-sm text-gray-800">
                Number of Patients work-up submission:<b> {notifications.length} </b>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
