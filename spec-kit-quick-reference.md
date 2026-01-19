# spec-kit 框架快速参考

**版本**: 1.0.0
**来源**: 提取自 spec-kit-workflow-explanation.md 第五部分

---

## 文件路径快速索引

### 按需求类型索引

**修改命令行为**：
- `.claude/commands/speckit.specify.md` (:23-193)
- `.claude/commands/speckit.plan.md` (:23-90)
- `.claude/commands/speckit.tasks.md` (:23-138)
- `.claude/commands/speckit.implement.md` (:15-136)
- `.claude/commands/speckit.constitution.md` (:18-83)

**修改模板内容**：
- `.specify/templates/spec-template.md` - User Stories, Requirements
- `.specify/templates/plan-template.md` - Technical Context, Project Structure
- `.specify/templates/tasks-template.md` - Phase 结构, 依赖关系
- `.specify/templates/agent-file-template.md` - 全文
- `.specify/memory/constitution.md` - Core Principles, Quality Gates

**修改脚本逻辑**：
- `.specify/scripts/bash/create-new-feature.sh` - generate_branch_name() (:180-226)
- `.specify/scripts/bash/check-prerequisites.sh` - validate (:102-120)
- `.specify/scripts/bash/update-agent-context.sh` - parse_plan_data() (:168-206)
- `.specify/scripts/bash/common.sh` - 各函数 (:4-157)

### 按命令索引文件依赖

**constitution**: 读写 `constitution.md`，验证 plan/spec/tasks 模板

**specify**:
- 脚本：`create-new-feature.sh`
- 输出：`spec.md`, `checklists/requirements.md`

**plan**:
- 脚本：`setup-plan.sh`, `update-agent-context.sh`
- 读取：`spec.md`, `constitution.md`
- 输出：`plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `CLAUDE.md`

**tasks**:
- 脚本：`check-prerequisites.sh`
- 读取：`plan.md`, `spec.md`, `data-model.md`, `contracts/`
- 输出：`tasks.md`

**implement**:
- 脚本：`check-prerequisites.sh`
- 读取：`tasks.md`, `plan.md`, `checklists/`, 所有设计文档
- 输出：项目代码, 更新的 `tasks.md`, 忽略文件

---

## 占位符完整清单

### 通用占位符
- `[FEATURE NAME]` - 功能名称
- `[###-feature-name]` - 分支名格式
- `[DATE]` - 日期 YYYY-MM-DD
- `$ARGUMENTS` - 用户输入

### spec-template.md
- `[Brief Title]`, `[Describe...]`, `[Why this priority]`, `[Independent Test]`
- `[initial state]`, `[action]`, `[expected outcome]`
- `[Entity 1/2]`, `[Measurable metric]`
- `[NEEDS CLARIFICATION: ...]` (≤3)

### plan-template.md
- `[FEATURE]`, `[link]`, `[Extract from spec]`
- Technical Context: 9 个字段
- `[Gates determined based on constitution]`
- `[REMOVE IF UNUSED] Option 1/2/3`

### tasks-template.md
- `[Title]`, `[Brief description]`, `[How to verify]`
- `[language]`, `[framework]`, `[endpoint]`, `[Entity]`, `[Service]`
- `[name]`, `[location]`, `[file]`

### agent-file-template.md
- `[PROJECT NAME]`, `[EXTRACTED FROM ALL PLAN.MD FILES]`
- `[ACTUAL STRUCTURE]`, `[ONLY COMMANDS]`
- `[LAST 3 FEATURES]`

### constitution.md
- `[PROJECT_NAME]`, `[CONSTITUTION_VERSION]`
- `[RATIFICATION_DATE]`, `[LAST_AMENDED_DATE]`
- `[PRINCIPLE_N_NAME]`

---

## 常用操作速查

### 创建新特性
```bash
/speckit.constitution "Focus on quality, testing, UX"
/speckit.specify "Add user authentication"
/speckit.plan "Use Node.js with Express"
/speckit.tasks
/speckit.implement
```

### 诊断问题
```bash
git rev-parse --abbrev-ref HEAD
ls -la specs/
.specify/scripts/bash/check-prerequisites.sh
grep -r "NEEDS CLARIFICATION" specs/003-feature/
grep -E '\[.*\]' specs/003-feature/spec.md | grep -v '^\s*-'
```

### 自定义模板
```bash
cp .specify/templates/spec-template.md .specify/templates/spec-template-custom.md
vim .specify/templates/spec-template-custom.md
vim .claude/commands/speckit.specify.md  # 添加模板选择
```

### 添加新技术栈
```bash
vim .specify/templates/plan-template.md  # 添加字段
vim .specify/scripts/bash/update-agent-context.sh  # 添加提取逻辑
vim .claude/commands/speckit.implement.md  # 添加忽略模式
```

---

## 错误信息速查

| 错误信息 | 解决方法 |
|---------|---------|
| "Not on a feature branch" | 运行 `/speckit.specify` |
| "plan.md not found" | 运行 `/speckit.plan` |
| "tasks.md not found" | 运行 `/speckit.tasks` |
| "ERROR if violations unjustified" | 填写说明或修改设计 |
| "No feature description" | 添加描述参数 |
| "Template not found" | 检查 .specify/templates/ |
| "Branch name exceeded 244 bytes" | 用 --short-name 缩短 |
| "Checklist incomplete" | 完成或选择继续 |

---

## 五命令速览

| 命令 | 功能 | 输入 | 输出 |
|------|------|------|------|
| `/speckit.constitution` | 创建项目原则 | 原则描述 | `constitution.md` |
| `/speckit.specify` | 生成规格说明 | 特性描述 | `spec.md` + 清单 |
| `/speckit.plan` | 生成技术计划 | 技术约束 | `plan.md` + 设计文档 + 更新 `CLAUDE.md` |
| `/speckit.tasks` | 分解任务 | 无 | `tasks.md` |
| `/speckit.implement` | 执行实施 | 无 | 项目代码 + 忽略文件 |

**命令依赖链**：
```
constitution (可选) → specify (必需) → plan (必需) → tasks (必需) → implement (必需)
```

---

详细说明请参考完整文档：`spec-kit-workflow-explanation.md`
