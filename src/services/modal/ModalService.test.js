import ModalService from './ModalService';

describe('ModalService', () => {
  it('should be able to stack modals', () => {
    const modalService = new ModalService();

    modalService.createModal();
    modalService.createModal();
    modalService.createModal();

    expect(modalService.getModals()).toHaveLength(3);
  });

  it('should be able to remove modal', () => {
    const modalService = new ModalService();

    const modal = modalService.createModal();
    const secondModal = modalService.createModal();
    modalService.removeModal(modal);

    const stackedModals = modalService.getModals();
    expect(stackedModals).toHaveLength(1);
    expect(stackedModals[0].getId()).toBe(secondModal.getId());
  });

  it('should be able to inject component to modal by a function', () => {
    const modalService = new ModalService();
    const component = 'testComponent';

    const modal = modalService.createModal(() => component);

    expect(modal.getComponent()).toBe(component);
  });

  it('should be able to listen to changes', () => {
    const modalService = new ModalService();
    const listenerSpy = jest.fn();

    modalService.setChangeListener(listenerSpy);
    const modal = modalService.createModal();
    modalService.removeModal(modal);

    expect(listenerSpy).toHaveBeenCalledTimes(2);
  });
});
