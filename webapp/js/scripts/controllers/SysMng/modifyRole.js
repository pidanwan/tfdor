/**
 * Created by chepeiqing on 16/10/13.
 */
define(['app', 'service'], function (app) {
    app.controller('modifyRoleCtrl', function (service, $scope, $location, $state, $stateParams, $rootScope) {
        $scope.init = function () {
            $scope.roleName = $stateParams.roleName;
            service.post2SRV("lodeMenu.do", null, function (data, status) {
                $scope.menuListM = data;
                var param = {
                    roleSeq:$stateParams.roleSeq
                };
                service.post2SRV("lodeMenu.do",param,function(data1, status){
                    for (var key in data) {
                        for(var key1 in data1){
                            var menuOneId = data[key].menuIdOne;
                            if(menuOneId == data1[key1].menuIdOne){
                                $scope.roleArr.push(menuOneId);
                                document.getElementById(menuOneId).checked = true;
                            }
                            var menuTwo = data[key].menuTwo;
                            for(var key3 in menuTwo){
                                var menuTwo2 = data1[key1].menuTwo;
                                for(var key4 in menuTwo2){
                                    var id = menuTwo[key3].id;
                                    if(id == menuTwo2[key4].id){
                                        $scope.roleArr.push(id);
                                        document.getElementById(id).checked = true;
                                    }
                                }
                            }
                        }
                    }
                });
            }, 4000);
        };
        $scope.roleArr = [];//定义数组用于存放前端选中权限

        $scope.cheAll = function (menuOneChecked, list) {//全选
            if ($('#' + menuOneChecked).is(':checked')) {
                $scope.remote($scope.roleArr, menuOneChecked);
                $scope.roleArr.push(menuOneChecked);
                for (var key in list) {
                    $scope.remote($scope.roleArr, list[key].id);
                    $scope.roleArr.push(list[key].id);
                    document.getElementById(list[key].id).checked = true;
                }
            } else {
                $scope.remote($scope.roleArr, menuOneChecked);
                for (var key in list) {
                    $scope.remote($scope.roleArr, list[key].id);
                    document.getElementById(list[key].id).checked = false;
                }
            }
        };

        $scope.chk = function (id, menuTwoChecked, list) {//单选或者多选
            var flag = 0;
            for (var key in list) {
                if ($('#' + list[key].id).is(':checked') == false) {
                    flag++;
                }
            }
            if (flag >= 0) {
                $scope.remote($scope.roleArr, menuTwoChecked);
                $scope.roleArr.push(menuTwoChecked);
                document.getElementById(menuTwoChecked).checked = true;
            }
            if (flag == list.length) {
                $scope.remote($scope.roleArr, menuTwoChecked);
                document.getElementById(menuTwoChecked).checked = false;
            }
            $scope.remote($scope.roleArr, id);
            if ($('#' + id).is(':checked') == true) {
                $scope.roleArr.push(id);
            }
        };

        $scope.remote = function (array, obj) {
            var index = $.inArray(obj, array);
            if (index >= 0) {
                array.splice(index, 1);
            }
        }
        $scope.show = function (id) {
            $('#aa' + id).slideToggle(500);
        }

        $scope.doId = function () {
            if ($scope.roleName == null || $scope.roleName == '') {
                showError("角色名称错误", "请输入角色名称");
                return;
            }
            if ($scope.roleArr == null || $scope.roleArr.length == 0) {
                showError("权限选择错误", "请选择权限");
                return;
            }
            var formData = {
                "roleName": $scope.roleName,
                "roleArr": $scope.roleArr.join(",")
            }
            console.log(formData);
            service.post2SRV("addRole.do", formData, function (data, status) {
                $state.go("Main.RoleManager");
            }, 4000);
        }
        $scope.init();
    });
});