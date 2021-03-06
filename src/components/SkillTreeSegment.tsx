import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { isEmpty } from 'lodash';
import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';
import { Skill } from '../models';
import { Nullable } from '../models/utils';
import SkillContext from '../context/SkillContext';
import { SELECTED_STATE, LOCKED_STATE, UNLOCKED_STATE } from './constants';

type Props = {
  skill: Skill;
  parentPosition: number;
  parentHasMultipleChildren: boolean;
  isOwner: boolean;
  shouldBeUnlocked: boolean;
  currentLevel: string | number | number;
  skillPoint: string | number;
} & typeof SkillTreeSegment.defaultProps;

function SkillTreeSegment({
  skill,
  hasParent,
  parentHasMultipleChildren,
  parentPosition,
  shouldBeUnlocked,
  currentLevel,
  skillPoint,
  isOwner,
}: Props) {
  const {
    mounting,
    skills,
    updateSkillState,
    decrementSelectedCount,
    incrementSelectedCount,
    handleNodeSelect,
    handleNodeRemove,
  } = useContext(SkillContext);

  const skillNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>> = useRef(
    null
  );
  const [learned, setLearned] = React.useState(skill.learned);
  const nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';
  const childrenLearnedState = skill.children.map((child: Skill) => {
    return skills[child.id];
  });

  useEffect(() => {
    setLearned(skill.learned);
  }, [skill.learned]);

  useEffect(() => {
    if (mounting) return;

    if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
      return updateSkillState(
        skill.id,
        LOCKED_STATE,
        skill.learned,
        skill.optional
      );
    }

    if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
      setLearned(skill.learned);
      return updateSkillState(
        skill.id,
        LOCKED_STATE,
        skill.learned,
        skill.optional
      );
    }
    if (!shouldBeUnlocked) {
      return;
    }

    if (nodeState === LOCKED_STATE && shouldBeUnlocked) {
      return updateSkillState(
        skill.id,
        UNLOCKED_STATE,
        skill.learned,
        skill.optional
      );
    }

    if (nodeState === SELECTED_STATE && shouldBeUnlocked && learned === 0) {
      return updateSkillState(
        skill.id,
        UNLOCKED_STATE,
        skill.learned,
        skill.optional
      );
    }
  }, [nodeState, shouldBeUnlocked, mounting, learned, childrenLearnedState]);

  useEffect(() => {
    if (mounting) return;

    if (isEmpty(skills)) {
      return updateSkillState(skill.id, UNLOCKED_STATE, skill.learned);
    }

    return;
  }, [mounting]);

  const handleLearnedChange = (newValue: number) => {
    setLearned(newValue);
  };

  return (
    <div
      style={{
        margin: !hasParent ? '16px 0' : '',
      }}
    >
      {hasParent && (
        <SkillEdge
          parentHasMultipleChildren={parentHasMultipleChildren}
          state={nodeState}
          childNodeRef={skillNodeRef}
          parentPosition={parentPosition}
        />
      )}
      <div ref={skillNodeRef}>
        <SkillNode
          incSkillCount={useCallback(incrementSelectedCount, [])}
          decSkillCount={useCallback(decrementSelectedCount, [])}
          updateSkillState={updateSkillState}
          currentLevel={currentLevel}
          skill={skill}
          learned={learned}
          skillPoint={skillPoint}
          isOwner={isOwner}
          handleLearnedChange={handleLearnedChange}
          nodeState={nodeState}
          childrenLearnedState={childrenLearnedState}
          handleNodeSelect={handleNodeSelect}
          handleNodeRemove={handleNodeRemove}
        />
      </div>
    </div>
  );
}

SkillTreeSegment.defaultProps = {
  hasParent: true,
};

export default SkillTreeSegment;
