import { RulesConf, RulesType } from './typing'

export default function useRulesType(data, opts: RulesConf = new RulesConf()) {
  const isTypePoint24 = computed(() => data[opts.type] === RulesType.GAME_POINT24)

  return { isTypePoint24 }
}
