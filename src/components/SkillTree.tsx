import React, { useContext } from 'react';
import { Skill, SavedDataType, ContextStorage } from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import CalculateNodeCount from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillContext';
import styled from 'styled-components';
import MobileContext from '../context/MobileContext';
import SkillCountSubtitle from './SkillCountSubtitle';

interface Props {
  treeId: string;
  data: Skill[];
  title: string;
  savedData?: SavedDataType;
  handleSave?: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => void;
}

const defaultParentPosition = {
  bottom: 0,
  center: 0,
};

function SkillTree({ data, title, treeId, savedData, handleSave }: Props) {
  const { isMobile } = useContext(MobileContext);

  return (
    <SkillTreeProvider
      treeId={treeId}
      savedData={savedData}
      handleSave={handleSave}
    >
      <CalculateNodeCount data={data} />
      <SkillTreeContainer>
        <SkillTreeTitle id={treeId}>{title}</SkillTreeTitle>
        <SkillCountSubtitle />
        <StyledSkillTree>
          {data.map((skill, i) => {
            const displaySeparator = data.length - 1 !== i && isMobile;

            return (
              <React.Fragment key={skill.id}>
                <SkillTreeSegment
                  shouldBeUnlocked={true}
                  parentPosition={defaultParentPosition}
                  hasParent={false}
                  skill={skill}
                />
                <HSeparator display={displaySeparator} />
              </React.Fragment>
            );
          })}
        </StyledSkillTree>
      </SkillTreeContainer>
    </SkillTreeProvider>
  );
}

export default SkillTree;

const SkillTreeContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  margin: 0 8px 48px;
  min-width: fit-content;

  @media (min-width: 900px) {
    margin: 0 8px 16px;
    min-width: initial;
    padding: 16px;
  }
`;

const SkillTreeTitle = styled.h2`
  font-family: ${({ theme }) => theme.headingFont};
  margin-bottom: 0;
  min-width: 152px;
  text-align: center;
`;

const StyledSkillTree = styled.div`
  background: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
