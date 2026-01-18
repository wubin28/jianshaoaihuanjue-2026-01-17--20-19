import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('Home - Prompt Optimizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);
  });

  // ==========================================
  // User Story 1: Generate Optimized Prompt
  // ==========================================

  describe('US1: Generate Optimized Prompt', () => {
    // T006: clicking button with input generates optimized prompt
    it('generates optimized prompt when clicking button with input', () => {
      render(<Home />);

      const textarea = screen.getByPlaceholderText(/输入/i);
      const button = screen.getByRole('button', { name: /查询常识/i });

      fireEvent.change(textarea, { target: { value: '什么是量子计算' } });
      fireEvent.click(button);

      // Should display output with prefix and suffix
      expect(screen.getByText(/你是专家。/)).toBeInTheDocument();
      expect(screen.getByText(/什么是量子计算/)).toBeInTheDocument();
      expect(screen.getByText(/请提供主要观点的3个不同出处的网页链接以便我查验/)).toBeInTheDocument();
    });

    // T007: input clears after generation
    it('clears input after generating optimized prompt', () => {
      render(<Home />);

      const textarea = screen.getByPlaceholderText(/输入/i) as HTMLTextAreaElement;
      const button = screen.getByRole('button', { name: /查询常识/i });

      fireEvent.change(textarea, { target: { value: '测试输入' } });
      fireEvent.click(button);

      expect(textarea.value).toBe('');
    });

    // T008: empty input ignored when button clicked
    it('ignores empty input when button is clicked', () => {
      render(<Home />);

      const button = screen.getByRole('button', { name: /查询常识/i });

      // Click without entering any text
      fireEvent.click(button);

      // Output should remain empty or show placeholder
      expect(screen.queryByText(/你是专家。/)).not.toBeInTheDocument();
    });

    // T009: new generation replaces previous output
    it('replaces previous output with new generation', () => {
      render(<Home />);

      const textarea = screen.getByPlaceholderText(/输入/i);
      const button = screen.getByRole('button', { name: /查询常识/i });

      // First generation
      fireEvent.change(textarea, { target: { value: '第一个问题' } });
      fireEvent.click(button);
      expect(screen.getByText(/第一个问题/)).toBeInTheDocument();

      // Second generation
      fireEvent.change(textarea, { target: { value: '第二个问题' } });
      fireEvent.click(button);

      // Should show new content
      expect(screen.getByText(/第二个问题/)).toBeInTheDocument();
      // Old content should be replaced
      expect(screen.queryByText(/第一个问题/)).not.toBeInTheDocument();
    });
  });

  // ==========================================
  // User Story 2: Copy Optimized Prompt
  // ==========================================

  describe('US2: Copy Optimized Prompt', () => {
    // T018: copy button copies output to clipboard
    it('copies output to clipboard when copy button is clicked', async () => {
      render(<Home />);

      const textarea = screen.getByPlaceholderText(/输入/i);
      const generateButton = screen.getByRole('button', { name: /查询常识/i });

      // Generate output first
      fireEvent.change(textarea, { target: { value: '测试复制' } });
      fireEvent.click(generateButton);

      // Click copy button
      const copyButton = screen.getByRole('button', { name: /复制/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining('测试复制')
        );
      });
    });

    // T019: copy button shows "已复制" feedback temporarily
    it('shows "已复制" feedback after copying', async () => {
      jest.useFakeTimers();
      render(<Home />);

      const textarea = screen.getByPlaceholderText(/输入/i);
      const generateButton = screen.getByRole('button', { name: /查询常识/i });

      fireEvent.change(textarea, { target: { value: '测试反馈' } });
      fireEvent.click(generateButton);

      const copyButton = screen.getByRole('button', { name: /复制/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /已复制/i })).toBeInTheDocument();
      });

      // After 2 seconds, should reset to "复制"
      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /复制/i })).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    // T020: copy button disabled/hidden when no output
    it('hides copy button when there is no output', () => {
      render(<Home />);

      // Copy button should not be visible initially
      expect(screen.queryByRole('button', { name: /复制/i })).not.toBeInTheDocument();
    });
  });

  // ==========================================
  // User Story 3: Responsive Layout
  // ==========================================

  describe('US3: Responsive Layout', () => {
    // T028: component renders correctly
    it('renders all main elements', () => {
      render(<Home />);

      // Title should be present
      expect(screen.getByRole('heading', { name: /减少AI幻觉/i })).toBeInTheDocument();

      // Input textarea should be present
      expect(screen.getByPlaceholderText(/输入/i)).toBeInTheDocument();

      // Generate button should be present
      expect(screen.getByRole('button', { name: /查询常识/i })).toBeInTheDocument();
    });
  });
});
