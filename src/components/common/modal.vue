<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">

                        </slot>
                        <slot name = "icon"></slot>
                        <!-- slot으로 지정해준 부분의 경우 상위 컴포넌트에서 slot name을 통해 변화가 가능하다 -->
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            
                            <!-- <button class="modal-default-button" @click="$emit('close')">
                                OK
                            </button> -->
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {

}
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        overflow : hidden;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 70%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        /* transition: all .3s ease; */
    }
    
    .modal-header h4 {
        margin-top: 0;
        color: rgba(66, 164, 244, 0.8);
        font-weight: bold;
        
    }

    .modal-body {
        margin: 20px 0;
        text-align: left;
        max-height: 100%;
        overflow-y: scroll;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    @media (max-width : 500px) {
        .modal-container {
            width : 90%;
        }
        .modal-header h4 {
            font-size : 1.2rem;
        }
    } 
</style>
