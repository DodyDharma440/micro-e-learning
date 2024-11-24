import React from "react";

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { useCourseDetail } from "../../contexts";

type ModalCourseDetailProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalCourseDetail: React.FC<ModalCourseDetailProps> = ({
  isOpen,
  onClose,
}) => {
  const { course } = useCourseDetail();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Detail Course</ModalHeader>
        <ModalBody>
          <div>
            <h4 className="font-bold mb-3">Trainer</h4>
            <div className="flex items-center gap-2">
              <Avatar src={course?.trainer.avatar?.url} alt="avatar" />
              <p className="whitespace-pre-wrap">{course?.trainer.name}</p>
            </div>
          </div>
          <hr className="dark:border-neutral-800" />
          <div>
            <h4 className="font-bold mb-3">Created for</h4>
            <p className="whitespace-pre-wrap">
              {course?.category?.name ?? "all"}
            </p>
          </div>
          <hr className="dark:border-neutral-800" />
          <div>
            <h4 className="font-bold mb-3">Description</h4>
            <p className="whitespace-pre-wrap">{course?.description}</p>
          </div>
          <hr className="dark:border-neutral-800" />
          <div>
            <h4 className="font-bold mb-3">Keypoints</h4>
            <ul className="list-disc list-inside">
              {course?.keypoints.map((k) => {
                return <li key={k}>{k}</li>;
              })}
            </ul>
          </div>
          <hr className="dark:border-neutral-800" />
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end">
            <Button>Close</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCourseDetail;
