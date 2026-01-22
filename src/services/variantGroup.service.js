import ApiService from './api.service';

const VariantGroupService = {
  getAllGroups: async () => {
    return await ApiService.get('variant-groups');
  },
  
  addGroup: async (data) => {
    return await ApiService.post('variant-groups', data);
  },
  
  deleteGroup: async (id) => {
    return await ApiService.delete(`variant-groups/${id}`);
  }
};

export default VariantGroupService;
