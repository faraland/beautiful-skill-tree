import { Nullable, Dictionary } from './utils';

export type Skill = MajorSkill | BaseSkill;

export type TooltipDirection = 'right' | 'left' | 'top' | 'bottom';

export type NodeState = 'locked' | 'unlocked' | 'selected';

export type SkillMap = Record<string, string>;

export interface SkillGroupData {
  skillCount: SkillCount;
  selectedSkillCount: SkillCount;
  resetSkills: VoidFunction;
  handleFilter: (query: string) => void;
}

export type SavedDataType = Dictionary<SkillData>;

export type SkillData = {
  optional: boolean;
  nodeState: NodeState;
  learned: number;
};

export interface SkillCount {
  required: number;
  optional: number;
}

export interface Tooltip {
  content: React.ReactNode;
  direction?: TooltipDirection;
}

export type Action = {
  type: ActionType;
};

export type ActionType =
  | 'SELECT_REQUIRED_SKILL'
  | 'DESELECT_REQUIRED_SKILL'
  | 'SELECT_OPTIONAL_SKILL'
  | 'DESELECT_OPTIONAL_SKILL'
  | 'RESET_SKILLS';

interface BaseSkill {
  id: string;
  optional?: boolean;
  color?: 'default' | 'alternative';
  title: string;
  tooltip: Tooltip;
  children: Skill[];
  levels: SkillLevel[];
  learned: number;
  actualLearned: number;
  parentId: number;
  requiredLevel: string;
  job: string;
  jobName: string;
  type: string;
}
interface MajorSkill extends BaseSkill {
  icon: string;
}

export interface SkillLevel {
  id: string;
  skillId: string;
  lvl: string;
  parsedDescription: string;
  manaCost: string;
  isLearned: boolean;
}
export type Direction = 'left' | 'right';

export interface ContextStorage {
  getItem: (key: string) => Nullable<string>;
  setItem: (key: string, value: string) => void;
}

export interface NodeSelectEvent {
  key: string;
  state: NodeState;
  skill: Skill;
  learned: number;
}
